require 'rails_helper'

RSpec.describe "locations#update", type: :request do
  subject(:make_request) do
    jsonapi_put "/api/v1/locations/#{location.id}", payload
  end

  describe 'basic update' do
    let!(:location) { create(:location) }

    let(:payload) do
      {
        data: {
          id: location.id.to_s,
          type: 'locations',
          attributes: {
            # ... your attrs here
          }
        }
      }
    end

    # Replace 'xit' with 'it' after adding attributes
    xit 'updates the resource' do
      expect(LocationResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { location.reload.attributes }
    end
  end
end
