require 'rails_helper'

RSpec.describe "locations#show", type: :request do
  let(:params) { {} }

  subject(:make_request) do
    jsonapi_get "/api/v1/locations/#{location.id}", params: params
  end

  describe 'basic fetch' do
    let!(:location) { create(:location) }

    it 'works' do
      expect(LocationResource).to receive(:find).and_call_original
      make_request
      expect(response.status).to eq(200)
      expect(d.jsonapi_type).to eq('locations')
      expect(d.id).to eq(location.id)
    end
  end
end
